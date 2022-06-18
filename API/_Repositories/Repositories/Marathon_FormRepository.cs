using API._Repositories.Interfaces;
using API.Data;
using API.Models;

namespace API._Repositories.Repositories
{
    public class Marathon_FormRepository : Repository<Marathon_Form>, IMarathon_FormRepository
    {
        public Marathon_FormRepository(DemoContext context) : base(context)
        {
        }
    }
}