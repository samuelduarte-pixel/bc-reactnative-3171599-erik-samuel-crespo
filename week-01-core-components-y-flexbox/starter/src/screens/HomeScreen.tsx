import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Medico } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  function handleItemPress(item: Medico): void {
    Alert.alert(
      'Agendar Cita',
      `¿Deseas una cita con ${item.nombre}?\n${item.especialidad}\n${item.consultorio}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => Alert.alert('¡Cita agendada!', 'Te contactaremos pronto.') },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.header}>
        <Text style={styles.logoIcono}>🌸</Text>
        <View style={styles.headerTextos}>
          <Text style={styles.headerTitle}>Clínica de Fertilidad ADME</Text>
          <Text style={styles.headerSubtitle}>
            Acompañándote hacia la maternidad y paternidad
          </Text>
        </View>
      </View>

      <View style={styles.statsContenedor}>
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>+1.200</Text>
          <Text style={styles.statEtiqueta}>Bebés nacidos</Text>
        </View>
        <View style={styles.statDivisor} />
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>15+</Text>
          <Text style={styles.statEtiqueta}>Años</Text>
        </View>
        <View style={styles.statDivisor} />
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>98%</Text>
          <Text style={styles.statEtiqueta}>Satisfacción</Text>
        </View>
      </View>

      <View style={styles.seccionHeader}>
        <Text style={styles.seccionTitulo}>Nuestros Especialistas</Text>
        <Text style={styles.seccionConteo}>{MOCK_ITEMS.length} médicos</Text>
      </View>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ITEMS.map((item: Medico) => (
          <ItemCard key={item.id} item={item} onPress={handleItemPress} />
        ))}
        <View style={styles.footer}>
          <Text style={styles.footerTexto}>📍 Bogotá — Calle 100 #15-30</Text>
          <Text style={styles.footerTexto}>📞 +57 (601) 234-5678</Text>
          <Text style={styles.footerSmall}>© 2025 Clínica de Fertilidad ADME</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  logoIcono: {
    fontSize: 32,
    marginRight: 12,
  },
  headerTextos: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#8b949e',
    marginTop: 2,
  },
  statsContenedor: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumero: {
    fontSize: 16,
    fontWeight: '800',
    color: '#58a6ff',
  },
  statEtiqueta: {
    fontSize: 10,
    color: '#8b949e',
    marginTop: 2,
  },
  statDivisor: {
    width: 1,
    backgroundColor: '#30363d',
  },
  seccionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  seccionConteo: {
    fontSize: 12,
    color: '#8b949e',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  footerTexto: {
    fontSize: 12,
    color: '#8b949e',
  },
  footerSmall: {
    fontSize: 11,
    color: '#30363d',
    marginTop: 6,
  },
});