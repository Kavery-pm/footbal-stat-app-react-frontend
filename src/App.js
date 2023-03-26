import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Center,
  Input,
  theme,
  Image,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons'
function App() {
  const [teamName, setTeamName] = useState('');
  const [teamData, setTeamData] = useState(null);


  const handleSearch = async () => {
    console.log(teamName);
    const response = await fetch(`https://nodejs-football-api.onrender.com/team/${teamName}`);
    const data = await response.json();
    console.log(data);
    setTeamData(data);
  };

  const handleTeamClick = async (teamName) => {
    const response = await fetch(`https://nodejs-football-api.onrender.com/team/${teamName}`);
    const data = await response.json();
    setTeamData(data);
  };

  return (
    <ChakraProvider theme={theme}>
      <Center bg='purple' h='100px' color='white'>
      <Heading as="h3" size="xl" mb={4}>
      Football Data and Statistics
        </Heading>
        </Center>
      <Box color="Red" p={3} style={{ textAlign: 'center' }}>
       
        <Input
          variant="outline"
          placeholder="Enter a team name"
          htmlSize={50}
          width="auto"
          type="text"
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
          style={{ color: 'black' }}
        />
        <br />
        <br />
        <Button
          colorScheme="purple"
          onClick={handleSearch}
          borderColor="green.500"
          margin="10px"
        >
          Search Team
        </Button>
        <Center>
       
        {teamData && (
          <Box
            maxW="lg"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            // alignItems="center"
            // display="flex"
            mt="2"
            position='relative'
          >
            <Center>
            <Image src={teamData.team.logo} alt={`${teamData.team.name} logo`} padding='10' align='center'/>
            </Center>
         
          
            <Box p="6">
              <Box display="flex" alignItems="baseline">
               
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="5"
                >
                 
                  <Text><span style={{fontWeight:'bold'}}>Name:</span>&nbsp;{teamData.team.name}</Text>
                 <Text><span style={{fontWeight:'bold'}}>Address:</span>&nbsp;{teamData.team.address}</Text>
                  <Text><span style={{fontWeight:'bold'}}>Phone:</span><PhoneIcon/>{teamData.team.phone}</Text>
                  <Text><span style={{fontWeight:'bold'}}>Website:</span>&nbsp;{teamData.team.website}</Text>
                </Box>
              </Box>
            </Box>
           
            <Accordion allowToggle color='purple'>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
         Click to know more about info and stats 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     
          <div>
<Text><span style={{fontWeight:'bold'}}>Matches Won:</span>&nbsp;{teamData.matches.won}</Text>
                 <Text><span style={{fontWeight:'bold'}}>Matches Lost:</span>&nbsp;{teamData.matches.lost}</Text>
                  <Text><span style={{fontWeight:'bold'}}>Goals:</span><PhoneIcon/>{teamData.matchesgoals}</Text>
                  <Text><span style={{fontWeight:'bold'}}>tied:</span>&nbsp;{teamData.matches.tied}</Text>
                  <Text><span style={{fontWeight:'bold'}}>away:</span>&nbsp;{teamData.matches.away}</Text>
                  <Text><span style={{fontWeight:'bold'}}>home:</span>&nbsp;{teamData.matches.home}</Text>
                  <Text><span style={{fontWeight:'bold'}}>Average Goals:</span>&nbsp;{teamData.matches.average}</Text>
                  </div>
       
   
    
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
          
          </Box>
        )}
        
        </Center>
      </Box>
     
      <Box mt={4}>
            <Heading as="h3" size="md" mb={2}>
              Other teams in the league
            </Heading>
            {teamData!==null && teamData.teams.map((team) => (
              <Box
                 key={team.id}
                 onClick={() => handleTeamClick(team.name)}
                
                maxW="md"
                borderWidth="5px"
                borderRadius="lg"
                overflow="hidden"
                borderColor="Purple"
                 alignItems="center"
                 display="inline-flex"
                mt="10"
                mr="10"
                ml="40"
               
              >
               
                <Text m={10}>{team.name}</Text>
              </Box>
             ))}
          </Box>
        
    </ChakraProvider>
  );
}

export default App;
