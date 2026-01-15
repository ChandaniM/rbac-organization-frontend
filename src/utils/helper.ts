export const ModifyData =(data:any)=>{
    const formattedData = data.map((formatData: any) => ({
        ...formatData,
        id: formatData._id 
      }));
      return formattedData
}