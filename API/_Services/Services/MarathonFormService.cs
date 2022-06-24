using API._Repositories;
using API._Services.Interfaces;
using API.Dtos;
using API.Helpers.Utilities;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Linq.Dynamic.Core;

namespace API._Services.Services
{
    public class MarathonFormService : IMarathonFormService
    {
        private readonly IRepositoryAccessor _repositoryAccessor;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;

        public MarathonFormService(
            IRepositoryAccessor repositoryAccessor,
            IMapper mapper,
            MapperConfiguration mapperConfiguration)
        {
            _repositoryAccessor = repositoryAccessor;
            _mapper = mapper;
            _mapperConfiguration = mapperConfiguration;
        }

        public async Task<OperationResult> CreateForm(Marathon_FormDto formDto)
        {
            var form = _mapper.Map<Marathon_Form>(formDto);
            form.Created_Time = DateTime.Now;
            form.Created_By = "administrator";
            form.Status = true;

            try
            {
                _repositoryAccessor.Marathon_Form.Add(form);
                await _repositoryAccessor.Save();
                return new OperationResult(true, form);
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async Task<PaginationUtility<Marathon_FormDto>> GetAllForms(PaginationParam pagination, Sortable sort)
        {
            var formsQuery = _repositoryAccessor.Marathon_Form
                .FindAll(x => x.Status)
                .ProjectTo<Marathon_FormDto>(_mapperConfiguration);

            if (!string.IsNullOrEmpty(sort.SortType) && sort.SortType != SortType.NONE)
            {
                formsQuery = formsQuery.OrderBy($"{sort.SortColumn} {sort.SortType}");
            }

            return await PaginationUtility<Marathon_FormDto>.CreateAsync(formsQuery, pagination.PageNumber, pagination.PageSize);
        }

        public async Task<Marathon_FormDto> GetForm(int record_ID)
        {
            var form = _mapper.Map<Marathon_FormDto>(await _repositoryAccessor.Marathon_Form.FindById(record_ID));
            return form;
        }

        public async Task<OperationResult> UpdateForm(Marathon_FormDto formDto)
        {
            var form = _mapper.Map<Marathon_Form>(formDto);
            form.Updated_Time = DateTime.Now;
            form.Updated_By = "administrator";

            try
            {
                _repositoryAccessor.Marathon_Form.Update(form);
                await _repositoryAccessor.Save();
                return new OperationResult(true, form);
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}