import React from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:6001/plants")
     .then((response) => {
      if (!response.ok) { 
        throw new Error("Failed to fetch plants")
     }
     return response.json();
  })
  .then((data) => 
    setPlants((currentPlants) => [ 
      ...data,
      ...currentPlants.filter( 
        (currentPlant) =>
          !data.some((plant) => plant.id === currentPlant.id)
    ),
  ])
)  

   .catch((error) => console.error("Error fetching plants:", error));
 }, []);
 

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
 );

 function handleAddPlant(newPlant) {
    setPlants((currentPlants) => [...currentPlants, newPlant]);
 }


  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
