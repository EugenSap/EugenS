using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Configuration;
using EugenS.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EugenS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        // GET: api/<CompaniesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            var result = new List<string>();
            using (var session = Startup.domain.OpenSession())
            {
                using (session.Activate())
                {
                    using (var tx = session.OpenTransaction())
                    {
                        var companies = session.Query.All<Company>();
                        result = companies.Select(x => x.CompanyName).ToList();
                    }
                }
            }
            return result;
        }

        // POST api/<CompaniesController>
        [HttpPost]
        public void Post(string ComapanyName)
        {
            using (var session = Startup.domain.OpenSession())
            {
                using (session.Activate())
                {
                    using (var tx = session.OpenTransaction())
                    {
                        var person = new Company() { CompanyName = ComapanyName }; // Note the empty constructor
                        tx.Complete();
                    }
                }
            }
        }
    }
}
