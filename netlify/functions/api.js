

export const handler = async (_event, _context) =>{

  return{
 
    statusCode: 200,
    body: JSON.stringify( [ {
      oil: "Olive",
      sap: 0.136
    },
    {
      oil: "Sunflower oil",
      sap: 0.136
    },
    {
      oil: "Coconut oil",
      sap: 0.184
    },
    {
      oil: "Shea butter",
      sap: 0.128
    },
    {
      oil: "Lard",
      sap: 0.139
    },
    {
      oil: "Butter - cow",
      sap: 0.136
    },
    {
      oil: "Beeswax",
      sap: 0.0690
    },
    {
      oil: "Castor oil",
      sap: 0.128
    },
    {
      oil: "Cocoa butter",
      sap: 0.137
    },
    {
      oil: "Palm oil",
      sap: 0.1405
    }])
  }
}