import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useLogin } from '@/hooks/useAuth';
import { useSessionStore } from '@/store/session';
import { LoginScreenProps } from '@/types/routes';

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const session = useSessionStore(({ session }) => session);
    const [login, loading, error] = useLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (session) {
            navigation.replace('Root');
        }
    }, [session]);

    return (
        <View style={{ justifyContent: 'center', height: '100%', padding: 20 }}>
            {error && (
                <Text style={{ color: 'red' }}>{error?.response?.data?.message}</Text>
            )}

            {loading && (
                <ActivityIndicator />
            )}

            <Text>Email</Text>
            <TextInput
                style={{
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    marginBottom: 20,
                    marginTop: 5,
                    padding: 10,
                    borderRadius: 8
                }}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
            />
    
            <Text>Contraseña</Text>
            <TextInput
                style={{
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    marginBottom: 20,
                    marginTop: 5,
                    padding: 10,
                    borderRadius: 8
                }}
                onChangeText={setPassword}
                autoCapitalize='none'
                secureTextEntry
            />

            <TouchableOpacity
                style={{
                    width: '100%',
                    backgroundColor: '#50BD',
                    padding: 10,
                    borderRadius: 8
                }}
                onPress={() => login(email, password)}
            >
                <Text style={{ color: '#fff', fontWeight:'bold', fontSize: 18, textAlign: 'center' }}>Iniciar</Text>
            </TouchableOpacity>
        </View>
    )
}