'use client'
import { Text, View } from 'react-native'
import { useParams, useRouter } from 'solito/navigation'

const useUserParams = useParams<{ userId: string }>

export function UserDetailScreen() {
  const { userId } = useUserParams()
  const router = useRouter()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => router.back()}>{userId}</Text>
    </View>
  )
}
