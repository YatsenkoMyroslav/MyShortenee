namespace MyShortenee.Repository;

public interface IRepository<T> where T : class
{
    T GetById(int id);
    Task<T> GetByIdAsync(int id);

    IQueryable<T> GetAll();

    void Add(T item);
    Task AddAsync(T item);

    void Update(T item);
    Task UpdateAsync(T item);

    void Remove(T item);
    Task RemoveAsync(T item);
}