using System.Text.Json.Serialization;

namespace ShapiroProject3.Services
{
    public class DataRetrivel
    {

        //task vs thread
        //task has async/await and a return value
        //task can do multiple things at once, thread can do one
        //can cancle a task
        //task is a higher level concept than a thread
        public async Task<string> GetData(string d)
        {
            //using statement at the end it automatically calls despose method
            using (var client = new HttpClient())
            {
                //setup
                client.BaseAddress = new Uri("https://ischool.gccis.rit.edu/api/");
                //clearing any headers in there
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                //try/catch
                try
                {
                    HttpResponseMessage res = await client.GetAsync(d, HttpCompletionOption.ResponseHeadersRead);
                    res.EnsureSuccessStatusCode();
                    var data = await res.Content.ReadAsStringAsync();
                    //at this point, data is just a string... I want to return json
                    return data;

                }
                catch (HttpRequestException hre)
                {
                    var msg = hre.Message;
                    return "HttpReq " + msg;
                }
                catch (Exception ex)
                {
                    var msg = ex.Message;
                    return "Ex " + msg;
                }

            }
        }
    }
}
