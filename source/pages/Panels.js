import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';

import Accordion from '../component/Accordion'; // Step 1

var Panels = React.createClass({ 

  render: function() { 
    return ( //Step 2 
      <ScrollView style={styles.container}> 
        <Accordion title="A Panel with short content text"
          expanded={false}> 
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </Accordion>
        <Accordion title="A Panel with long content text"
          expanded={true}>
          <Text>Lorem ipsum...</Text> 
        </Accordion> 
        <Accordion title="Another Panel"
          expanded={false}> 
          <Text>Lorem ipsum dolor sit amet...</Text> 
        </Accordion> 
      </ScrollView> 
    ); 
  }
});

const styles = StyleSheet.create({ 
  container: { 
    flex : 1, 
    backgroundColor : '#f4f7f9', 
    paddingTop : 30 
  }, 
});

export default Panels;