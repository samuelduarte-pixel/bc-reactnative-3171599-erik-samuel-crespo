import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Medico } from '../types';

interface ItemCardProps {
  item: Medico;
  onPress: (item: Medico) => void;
}

const colorDisponibilidad: Record<Medico['disponibilidad'], string> = {
  Disponible: '#22C55E',
  Ocupado:    '#EF4444',
  Vacaciones: '#F59E0B',
};

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(item)}
    >
      <View style={styles.filaImagen}>
        <Image
          source={{ uri: item.imageUri }}
          style={styles.imagen}
          resizeMode="cover"
        />
        <View style={styles.infoContenedor}>
          <View
            style={[
              styles.badge,
              { backgroundColor: colorDisponibilidad[item.disponibilidad] },
            ]}
          >
            <Text style={styles.badgeTexto}>{item.disponibilidad}</Text>
          </View>
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.especialidad}>{item.especialidad}</Text>
          <Text style={styles.detalle}>{item.consultorio}</Text>
          <Text style={styles.detalle}>{item.añosExperiencia} años de exp.</Text>
        </View>
      </View>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <View style={styles.boton}>
        <Text style={styles.botonTexto}>Agendar Cita</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c2128',
    borderRadius: 14,
    marginBottom: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardPressed: {
    opacity: 0.75,
  },
  filaImagen: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imagen: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#58a6ff',
  },
  infoContenedor: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 5,
  },
  badgeTexto: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  nombre: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  especialidad: {
    fontSize: 12,
    fontWeight: '600',
    color: '#58a6ff',
    marginBottom: 3,
  },
  detalle: {
    fontSize: 11,
    color: '#8b949e',
    lineHeight: 16,
  },
  subtitle: {
    fontSize: 13,
    color: '#8b949e',
    lineHeight: 19,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: '#238636',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});