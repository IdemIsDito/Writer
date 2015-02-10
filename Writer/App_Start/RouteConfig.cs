using System.Web.Mvc;
using System.Web.Routing;

namespace Writer
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
			
			routes.MapRoute(
				"ReturningParticipant",
				"{guid}",
				new {
					controller = "Home",
					action = "ReturningParticipant"
				}
			);
			
			routes.MapRoute(
				"Default", 
				"{controller}/{action}/{id}",
				new {
					controller = "Home",
					action = "Index",
					id = UrlParameter.Optional
				}
			);
		}
	}
}