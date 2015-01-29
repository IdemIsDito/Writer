using System.Linq;
using System.Web.Http;
using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using Writer.Models;

namespace Writer.Controllers
{
	[BreezeController]
	public class DataController : ApiController
	{
		private readonly EFContextProvider<WriterContext> _context = new EFContextProvider<WriterContext>();

		[HttpGet]
		public string Metadata()
		{
			return _context.Metadata();
		}

		[HttpGet]
		public IQueryable<Story> Stories()
		{
			return _context.Context.Stories;
		}

		[HttpPost]
		public SaveResult SaveChanges(JObject saveBundle)
		{
			return _context.SaveChanges(saveBundle);
		}
	}
}