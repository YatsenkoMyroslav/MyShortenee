using Microsoft.EntityFrameworkCore;
using MyShortenee.Data;

namespace MyShortenee.Repository;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly ApplicationDbContext db;
    protected DbSet<T> dbSet;

    public Repository(ApplicationDbContext dbContext)
    {
        this.db = dbContext;
        dbSet = dbContext.Set<T>();
    }

    public void Add(T item)
    {
        dbSet.Add(item);
        db.SaveChanges();
    }

    public async Task AddAsync(T item)
    {
        await dbSet.AddAsync(item);
        await db.SaveChangesAsync();
    }

    public IQueryable<T> GetAll()
    {
        return dbSet;
    }

    public T GetById(int id) => dbSet.Find(id);

    public async Task<T> GetByIdAsync(int id) => await dbSet.FindAsync(id);

    public void Remove(T item)
    {
        dbSet.Remove(item);
        db.SaveChanges();
    }

    public async Task RemoveAsync(T item)
    {
        dbSet.Remove(item);
        await db.SaveChangesAsync();
    }

    public void Update(T item)
    {
        dbSet.Update(item);
        db.SaveChanges();
    }

    public async Task UpdateAsync(T item)
    {
        dbSet.Update(item);
        await db.SaveChangesAsync();
    }
}