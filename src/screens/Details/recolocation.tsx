import React from 'react';

import { 
  Text, 
  View, 
  TouchableOpacity, 
  Touchable,
  StyleSheet,
  Image
} from 'react-native';

import { Container } from './styles';

import { InfoReplacement } from '../../components/Info/infoReplacement';

function VacancyDetails() {
  return (
    <Container>
      <View style={styles.header}>  
        <TouchableOpacity
          style={styles.bottonBack}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <Text style={styles.bottonBackText}> {'<'} </Text>
        </TouchableOpacity>

        <Text style={styles.title}> Detalhes da Recolocação </Text>
      </View>

      <TouchableOpacity
        style={styles.imageUser}
      >
      </TouchableOpacity>

      <View style={styles.areaRecolocation}> 
        <Text style={styles.areaRecolocationText}> Programador </Text>
      </View>

      <View style={styles.RecolocationDesc}>
        <Text style={styles.RecolocationDescText}>
          Tiago de Moura está buscando recolocação 
          no mercado no cargo de Programador.
        </Text>
      </View>

      <View style={styles.vagaInfo}>
        <InfoReplacement/>
      </View>

      <TouchableOpacity
        style={styles.bottonApply}
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <Text style={styles.bottonApplyText}> ENTRAR EM CONTATO </Text>
      </TouchableOpacity>

    </Container>
  );
}

const styles = StyleSheet.create({
  header:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 530,
    backgroundColor: '#303030',
  },

  bottonBack: {
    top: 25,
    left: 20,
  },

  bottonBackText:{
    color: '#AEAEB3',
    fontSize: 20,
  },

  title:{
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 25,
    lineHeight: 27,
  },

  imageUser:{
    alignItems: 'center',
    borderWidth:1,
    position: 'absolute',
    width: 180,
    height: 180,
    left: 98,
    top: 137,
    borderRadius:100,
    backgroundColor: 'black',
  },

  areaRecolocation:{
    position: 'absolute',
    alignItems: 'center',
    width: 150,
    height: 27,
    left: 113,
    top: 338,
  },

  areaRecolocationText:{
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 27,

    color: '#47474D',
  },

  RecolocationDesc:{
    position: 'absolute',
    width: 332,
    height: 82,
    top: 414,
    left: 24,
  },

  RecolocationDescText:{
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: 18,

    color: '#47474D',
  },

  vagaInfo:{
    position: 'absolute',
    width: 350,
    height: 202,
    left: 15,
    top: 496,
  },

  bottonApply:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 335,
    height: 56,
    top: 720,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: '#E83F5B',
  },

  bottonApplyText:{
    textAlign: 'center',
    color: '#FFFFFF',
  }

});

export default VacancyDetails;

