using System.Data.Entity;

namespace Writer.Models
{
	public class Initializer : DropCreateDatabaseIfModelChanges<WriterContext>
	{
		protected override void Seed(WriterContext context)
		{
			context.SaveChanges();
		}
	}
}