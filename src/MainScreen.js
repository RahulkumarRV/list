import React, {useState, useEffect} from "react";
import {TextInput ,Alert, FlatList, SafeAreaView, Button, Image, StyleSheet, Text, View } from "react-native";

const ItemRender = ({navigation , jsonData}) => (
    <View style={{ padding: 12, backgroundColor: "pink" 
          , margin: 1}}
    onPress={() =>
        navigation.navigate('Profile', { data: jsonData })
      }>
      <Text > {jsonData.title} </Text>
      <Text > {jsonData.author} </Text>
      <Text > {jsonData.createdAt} </Text>
      <Text > {jsonData.url} </Text>
    </View>
  );

function MainScreen({ navigation }) {
  const [data, setData] = useState([]);
  let [page, setPage] = useState(0);
  const [isError, SetisError] = useState(true);
  const [prefix, setPrefix] = useState("");
  
  async function fetchData() {
      await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${0}`
      )
        .then((res) => res.json())
        .then((res) => {
          setData([...data, ...res.hits]);
          });
    }

  const getData = async () => {
    
    await fetch(
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`
    )
      .then((res) => {
        res.json().then((res) => {
          if (res.hits.length === 0) {
            SetisError(false);
            return;
          }
          console.log(res, "jdskfjldsl");
          setData([...data, ...res.hits]);
        });
      })
      .catch((res) => {
        SetisError(false);
      })
  };

  function increasePage(pageNumber){
    if(pageNumber + 1 <= 10){
      return pageNumber + 1;
    }
    else return pageNumber;
  }

  useEffect(() => {
    if(isError){
      getData();
    const interval = setInterval(() => {
      if(page !== increasePage(page))
        setPage((page) => increasePage(page));
    }, 10000000);

    return () => {
      clearInterval(interval);
    };
    }
  }, [page]);

  function handleChange(){
    console.log(data, "f");
    setData(data.filter((item) => {
      return item.author.includes(prefix);
    }));
    console.log(data, "s");
  }
  

  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={{height: 400}}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ItemRender jsonData={item} navigation={navigation} />}
        keyExtractor={item => item.objectID}
        // onEndReached={onEnd}
        // extraData={data}
      />
      </View>
      <View style={{padding: 1}}>
          <TextInput 
          style={styles.input}
          onChangeText={setPrefix}
          value={prefix}
          placeholder="filter data"
        />
        <Button title="search" 
        onPress={handleChange}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default MainScreen;
