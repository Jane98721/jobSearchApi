/*
const searchJobs = async (keyword: string) => {
  try {
    const result: string = `https://jobsearch.api.jobtechdev.se/search?q=${keyword}&offset=0&limit=10`;
    const response: Response = await fetch(result);
    const data = await response.json()
    
    console.log(`\n Found ${data.hits.length} jobs`)
    console.log("-".repeat(50))

    data.hits.forEach((job:any, index:number) => {

      const pubDate = new Date(job.publication_date);
      console.log("pubData: ", pubDate)

      console.log(`${index + 1}.${job.headline}`)
      console.log(`Company: ${job.employer.name}`)
      console.log(`Location: ${job.workplace_address.municipality}`)
      console.log(`Publication: ${pubDate.toISOString().split("T")[0]}`)
      console.log("-".repeat(50))
    });
  } catch (error: unknown) {
    console.error(error)
  }
};*/

interface Job {
  publication_date: string;
  headline: string;
  id: string;
  employer: {
     name: string;
  }
  workplace_address:{
    municipality: string;
  },
  employment_type:{
    label: string
  }
}

const searchByProfessionAndCity = async () => {
  try {
    const result: Response = await fetch (
      `https://jobsearch.api.jobtechdev.se/search?q=developer/malmö&offset=0&limit=10000`
    );
    
    if(!result.ok){   
      throw new Error(`${result.status}`)
    }

    const data = await result.json();

    data.hits.forEach((job: Job) => {
    const pubDate = new Date(job.publication_date);
      console.log(`Id: ${job.id}`)
      console.log(`Role: ${job.headline}`);
      console.dir(`Location: ${job.workplace_address.municipality}`);
      console.dir(`${job.employer.name}`);
      console.dir(`Employment type: ${job.employment_type.label}`)       
      console.log(`Publication: ${pubDate.toISOString().split("T")[0]}`);
      console.log("-".repeat(50));
    })
  } catch (error) {
    console.log('Something went wrong', error)
  }
};

const runApp = () => {
  try {
    console.log("Welcome to the Job Search App!")
    console.log("This app searches for jobs using JobTeach API")
    searchByProfessionAndCity()
  } catch(error) {
    console.error(error)
  }
};

runApp()