import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import localImg from './assets/local.png';
import contatoImg from './assets/contato.png';
import qualificacaoImg from './assets/qualificacao.png';
import quantVagasImg from './assets/quantVagas.png';
import userImg from './assets/user.png';
import areaImg from './assets/area.png';

export function InfoWage(){
  return(
    <View>
      <View style={styles.vagaLocal}>
        <Image source={localImg}/>
        <Text style={styles.vagaLocalText}> Teresina - PI </Text>
      </View>

      <View style={styles.vagaContact}>
        <Image source={contatoImg}/>
        <Text style={styles.vagaContactText}> (99) 99999-9999 </Text>
      </View>

      <View style={styles.vagaArea}>
        <Image source={areaImg}/>
        <Text style={styles.vagaAreaText}> TI </Text>
      </View>

      <View style={styles.vagaGrad}>
        <Image source={qualificacaoImg}/>
        <Text style={styles.vagaGradText}> Graduação </Text>
      </View>

      <View style={styles.vagaQuant}>
        <Image source={quantVagasImg}/>
        <Text style={styles.vagaQuantText}> 1 vaga </Text>
      </View>

      <View style={styles.nameUser}>
        <Image source={userImg}/>
        <Text style={styles.nameUserText}> Tiago Moura </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  vagaLocal:{
    borderRadius: 4,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    width: 109,
    height: 92,
    left: 7,
    top: 10,
    backgroundColor: '#F4F5F6',
  },

  vagaLocalText:{
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 5,

    color: '#7A7A80'
  },

  vagaContact:{
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 109,
    height: 92,
    left: 124,
    top: 10,
    backgroundColor: '#F4F5F6',
  },

  vagaContactText:{
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 5,

    color: '#7A7A80'
  },

  vagaArea:{
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 109,
    height: 92,
    left: 241,
    top: 10,
    backgroundColor: '#F4F5F6',
  },

  vagaAreaText:{
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 5,

    color: '#7A7A80'
  },

  vagaGrad:{
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F5F6',
    width: 109,
    height: 92,
    left: 7,
    top: 110,
  },

  vagaGradText:{
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 5,

    color: '#7A7A80'
  },

  vagaQuant:{
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F5F6',
    position: 'absolute',
    width: 109,
    height: 92,
    left: 124,
    top: 110,
  },

  vagaQuantText:{
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 5,

    color: '#7A7A80'
  },

  nameUser:{
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F5F6',
    position: 'absolute',
    width: 109,
    height: 92,
    left: 241,
    top: 110,
  },

  nameUserText:{
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 5,

    color: '#7A7A80'
  },
});