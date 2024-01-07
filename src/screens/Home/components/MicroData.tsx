import { format } from '@/utils/helpers';
import { memo } from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface MicroDataProps {
    value: number;
    label: string;
    icon: ImageSourcePropType;
}

const MicroData = ({ icon, label, value }: MicroDataProps) => (
    <View style={{ alignItems: 'center' }}>
        <Image
            source={icon}
            style={{ width: 24, height: 24 }}
        />
        <Text style={styles.label}>{label}</Text>
	    <Text style={styles.value}>$ {format.cash(value)}</Text>
    </View>
);

const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        color: '#FFFFFF70',
        fontWeight: '300'
    },
    value: {
        fontSize: 12,
        color: '#FFF'
    }
});

export default memo(MicroData);