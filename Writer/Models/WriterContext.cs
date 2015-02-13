using System;
using System.Data.Entity;

namespace Writer.Models
{
	public class WriterContext : DbContext
	{
		public WriterContext() : base("WriterContext")
		{
		}

		public IDbSet<Participant> Participants { get; set; }
		public IDbSet<ClassicActivity> ClassicActivities { get; set; }
		public IDbSet<EnhancedActivity> EnhancedActivities { get; set; }

		public override int SaveChanges()
		{
			var sysdate = DateTime.Now;
			var changeSet = ChangeTracker.Entries<IEntity>();
			
			foreach (var dbEntityEntry in changeSet)
			{
				switch (dbEntityEntry.State)
				{
					case EntityState.Detached:
						break;
					case EntityState.Unchanged:
						break;
					case EntityState.Added:
						dbEntityEntry.Entity.CreatedDate = sysdate;
						dbEntityEntry.Entity.UpdatedDate = sysdate;
						break;
					case EntityState.Deleted:
						break;
					case EntityState.Modified:
						dbEntityEntry.Entity.UpdatedDate = sysdate;
						break;
					default:
						throw new ArgumentOutOfRangeException();
				}
			}
			return base.SaveChanges();
		}
	}
}