import React, {useState, useEffect, cache} from "react";
import { View, Text, Image, TextInput, SafeAreaView, ScrollView } from "react-native";
import api from './src/services/api';
import { globalStyles } from "./src/style/globalStyle";
 
export default function App(){
  const [filmes, setFilmes] = useState[[]];
  const [pesquisa, setPesquisa] = useState('');
 
  useEffect(() =>{
    async function carrgarFilmes(){
      if(pesquisa.trim() !== ''){
        try{
          const resposta = await api.get(pesquisa.replace('','%20'));
          setFilmes(resposta.data);
        }catch(error){
          console.error('ERRO !',error);
        }
      }else {
        setFilmes([]);
      }
    }
 
    carrgarFilmes()
  }, [pesquisa])
 
  const handlePesquisa = (texto) =>{
    setPesquisa(texto);
  }
 
  return(
    <SafeAreaView style={globalStyles.container}>
      <TextInput
        style={globalStyles.input}
        placeholder="digite o nome do filme"
        value={pesquisa}
        onChangeText={handlePesquisa}
      />
 
      <Text style={globalStyles.titulo}>
        Resultado(s) da pesquisa
      </Text>
 
      <ScrollView contentContainerStyle={globalStyles.lista}>
        {filmes.map((filme) =>(
          <View key={filme.show.id} style={globalStyles.card}>
            {filme.show.image && (
              <Image
              source={{uri: filme.show.image.medium}}
              style={globalStyles.imagem}
              resizeMode="cover"
              />
            )}
 
            <View style={globalStyles.infoContainer}>
              <Text style={globalStyles.tituloFilme} numberOfLines={1}>
                {filme.show.name}
              </Text>
              <Text style={globalStyles.url} numberOfLines={2}>
                {filme.show.url}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
 
}