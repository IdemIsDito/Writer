using System.Web.Mvc;

namespace Writer.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index(
#if DEBUG
			bool scriptCache = false
#else
			bool scriptCache = true
#endif
			,
#if DEBUG
			bool debug = true
#else
			bool debug = false
#endif
			)
		{
			string siteRoot = HttpContext.Request.ApplicationPath ?? "";

			if (siteRoot.EndsWith("/"))
			{
				siteRoot = siteRoot.Substring(0, siteRoot.Length - 1);
			}
			var config =
				new Config
				{
					siteRoot = siteRoot,
					breezeRoot = siteRoot + "/breeze/",
					imageRoot = siteRoot + "/Content/images/",
					appJs = siteRoot + "/App/main",
					scriptCache = scriptCache,
					debug = debug
				};

			ViewBag.SiteConfig = config;

			return View();
		}

		public ActionResult IndexReturningParticipant(string id,
#if DEBUG
			bool scriptCache = false
#else
			bool scriptCache = true
#endif
			,
#if DEBUG
			bool debug = true
#else
			bool debug = false
#endif
			)
		{
			string siteRoot = HttpContext.Request.ApplicationPath ?? "";

			if (siteRoot.EndsWith("/"))
			{
				siteRoot = siteRoot.Substring(0, siteRoot.Length - 1);
			}

			var config =
				new Config
				{
					siteRoot = siteRoot,
					breezeRoot = siteRoot + "/breeze/",
					imageRoot = siteRoot + "/Content/images/",
					appJs = siteRoot + "/App/main",
					scriptCache = scriptCache,
					debug = debug,
					participantGuid = id
				};

			ViewBag.SiteConfig = config;

			return View("Index");
		}
	}

	public class Config
	{
		// ReSharper disable InconsistentNaming
		public string siteRoot { get; set; }
		public string breezeRoot { get; set; }
		public string imageRoot { get; set; }
		public string appJs { get; set; }
		public bool scriptCache { get; set; }
		public bool debug { get; set; }
		public string participantGuid { get; set; }
		// ReSharper restore InconsistentNaming
	}
}