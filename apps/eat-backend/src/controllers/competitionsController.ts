import { FastifyInstance } from 'fastify';
import { initORM } from '../db';
import { Body, ParamId, ValidationError } from '../types';
import { competitionData } from '../data';
import dayjs from 'dayjs';
import { Team } from '../entities';

// Arrow function not supported, the server is bound to this
export async function competitionsController(server: FastifyInstance) {
  const db = await initORM();

  server.get('/', async () => {
    const competitions = await competitionData.list(db);
    if (!competitions.length) {
      return [];
    }
    return competitions.map(({ id, startDate, endDate, teams }) => ({
      id,
      startDate,
      endDate,
      teams: teams.map(mapTeam),
    }));
  });

  server.get('/groupByYear', async () => {
    const competitions = await competitionData.list(db);
    if (!competitions.length) {
      return [];
    }

    const years = [
      ...new Set(
        competitions
          .sort((a, b) =>
            dayjs(a.startDate).year() > dayjs(b.startDate).year() ? 1 : -1,
          )
          .map(({ startDate }) => dayjs(startDate).format('YYYY')),
      ),
    ].filter(Boolean);

    const competitionsPerYear = (year: string) => {
      return competitions
        .filter(({ startDate }) => dayjs(startDate).format('YYYY') === year)
        .sort((a, b) => (a.startDate > b.startDate ? -1 : 1))
        .map(({ id, startDate, endDate, teams }) => ({
          id,
          startDate,
          endDate,
          teams: teams.map(mapTeam),
        }));
    };

    return years.map((year) => ({
      year,
      competitions: competitionsPerYear(year),
    }));
  });

  server.get<ParamId>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const { id, startDate, endDate, teams } = await competitionData.getById(
      db,
      uuid,
    );
    return { id, startDate, endDate, teams: teams.map(mapTeam) };
  });

  server.post<CompetitionBody>('/', async (request, reply) => {
    const body = request.body;
    if (!body.startDate) {
      const error = new ValidationError('Competition start date is required');
      return reply.code(400).send(error);
    }
    if (!body.endDate) {
      const error = new ValidationError('Competition end date is required');
      return reply.code(400).send(error);
    }
    if (dayjs(body.startDate).isAfter(dayjs(body.endDate))) {
      const error = new ValidationError(
        'Competition start date has to be before end date',
      );
      return reply.code(400).send(error);
    }
    const { id, startDate, endDate } = await competitionData.create(db, body);
    return { id, startDate, endDate, teams: [] };
  });

  server.post<ParamId & TeamsRequest>(
    '/addTeam/:uuid',
    async (request, reply) => {
      const { uuid } = request.params;
      const body = request.body;
      if (!body.teams.length) {
        const error = new ValidationError('Atleast one team is required');
        return reply.code(400).send(error);
      }
      const { id, startDate, endDate, teams } = await competitionData.addTeam(
        db,
        uuid,
        body.teams,
      );
      return { id, startDate, endDate, teams: teams.map(mapTeam) };
    },
  );

  server.post<ParamId & TeamsRequest>(
    '/removeTeam/:uuid',
    async (request, reply) => {
      const { uuid } = request.params;
      const body = request.body;
      if (!body.teams.length) {
        const error = new ValidationError('Atleast one team is required');
        return reply.code(400).send(error);
      }
      const { id, startDate, endDate, teams } =
        await competitionData.removeTeam(db, uuid, body.teams);
      return { id, startDate, endDate, teams: teams.map(mapTeam) };
    },
  );

  server.patch<ParamId & CompetitionBody>('/:uuid', async (request, reply) => {
    const { uuid } = request.params;
    const body = request.body;
    if (!body.startDate) {
      const error = new ValidationError('Competition start date is required');
      return reply.code(400).send(error);
    }
    if (!body.endDate) {
      const error = new ValidationError('Competition end date is required');
      return reply.code(400).send(error);
    }
    if (dayjs(body.startDate).isAfter(dayjs(body.endDate))) {
      const error = new ValidationError(
        'Competition start date has to be before end date',
      );
      return reply.code(400).send(error);
    }
    const { id, startDate, endDate, teams } = await competitionData.update(
      db,
      uuid,
      body,
    );
    return { id, startDate, endDate, teams: teams.map(mapTeam) };
  });

  server.delete<ParamId>('/:uuid', async (request) => {
    const { uuid } = request.params;
    await competitionData.remove(db, uuid);
    return { sucess: true };
  });
}

type CompetitionBody = {
  Body: {
    startDate: string;
    endDate: string;
  };
};
interface TeamsRequest {
  Body: { teams: string[] };
}

const mapTeam = (team: Team) => ({ id: team.id, name: team.name });
