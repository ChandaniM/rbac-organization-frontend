export const ModifyJobData =(data:any)=>{
    const formattedData = data.map((job: any) => ({
        ...job,
        id: job._id // DynamicTable requires 'id'
      }));
      return formattedData
}