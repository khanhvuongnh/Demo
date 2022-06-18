using API._Repositories.Interfaces;
using API._Repositories.Repositories;
using API.Data;

namespace API._Repositories
{
    public class RepositoryAccessor : IRepositoryAccessor
    {
        private DemoContext _dbContext;
        public RepositoryAccessor(DemoContext dbContext)
        {

            _dbContext = dbContext;
            Marathon_Form = new Marathon_FormRepository(_dbContext);
        }

        public IMarathon_FormRepository Marathon_Form { get; private set; }

        public async Task<bool> Save()
        {
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}