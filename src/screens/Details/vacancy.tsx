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

import { InfoWage } from '../../components/Info/infoWage';

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

        <Text style={styles.title}> Detalhes da Vaga </Text>
      </View>

      <TouchableOpacity
        style={styles.imageUser}
      >
      </TouchableOpacity>

      <View style={styles.vagaName}> 
        <Text style={styles.firstName}> Técnico </Text>
        <Text style={styles.secondName}> Suporte Externo </Text>
      </View>

      <View style={styles.wageDescription}> 
        <Text style={styles.wageName}> Salário </Text>
        <Text style={styles.wageValue}> R$ 2.000 </Text>
      </View>

      <View style={styles.vagaDescription}>
        <Text style={styles.vagaDescriptionText}>
          Use suas habilidades como gostar tecnologia e de 
          ajudar pessoas para fazer parte de uma das 
          melhores empresas para trabalhar no Brasil.
        </Text>
      </View>

      <View style={styles.vagaInfo}>
        <InfoWage/>
      </View>

      <TouchableOpacity
        style={styles.bottonApply}
        activeOpacity={0.8}
        onPress={() => {}}
      >
        <Text style={styles.bottonApplyText}> CANDIDATAR-SE </Text>
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

  vagaName:{
    position: 'absolute',
    width: 185,
    height: 42,
    left: 23,
    top: 348,
  },

  firstName:{
    fontStyle: 'normal',
    fontSize: 10,
    lineHeight: 11,

    letterSpacing: 0.04,
    textTransform: 'uppercase',

    color: '#AEAEB3',
  },

  secondName:{
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 27,

    color: '#47474D',
  },

  wageDescription:{
    position: 'absolute',
    width: 102,
    height: 42,
    left: 254,
    top: 348,
  },

  wageName:{
    fontStyle: 'normal',
    fontSize: 10,
    lineHeight: 11,

    letterSpacing: 0.04,
    textTransform: 'uppercase',

    color: '#AEAEB3',
  },

  wageValue:{
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 27,

    color: '#E83F5B',
  },

  vagaDescription:{
    position: 'absolute',
    width: 332,
    height: 82,
    top: 414,
    left: 24,
  },

  vagaDescriptionText:{
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
