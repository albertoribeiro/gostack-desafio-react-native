import React, {useState, useEffect} from "react";
import api from './services/api'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

export default function App() {

  const [repos,setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
    });
  },[]);


  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    const likedRepo = response.data;
    const reposUpdated = repos.map( repo => {
      return repo.id ===id ? likedRepo : repo;
    })
    
    setRepos(reposUpdated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repos} 
          keyExtractor={repo => repo.id}
          renderItem={({item}) => (
            <>
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{item.title} </Text>
                <View style={styles.techsContainer}>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
                    {item.techs.map(tech => (
                          <Text style={styles.tech} key={tech}>{tech} </Text>
                      ))}
                  </ScrollView>
                </View>
                <View style={styles.likesContainer}>
                  <Text  style={styles.likeText}
                    testID={`repository-likes-${item.id}`}
                  >
                     {item.likes} curtidas
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(item.id)}
                  testID={`like-button-${item.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        />

         
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between", 
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
