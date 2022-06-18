using API._Repositories.Interfaces;

namespace API._Repositories
{
    public interface IRepositoryAccessor
    {
        IMarathon_FormRepository Marathon_Form { get; }
        Task<bool> Save();
    }
}