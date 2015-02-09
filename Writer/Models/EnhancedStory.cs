using System.Runtime.Serialization;

namespace Writer.Models
{
	[DataContract]
	public class EnhancedStory : AppEntity
	{
		[DataMember]
		public string First { get; set; }

		[DataMember]
		public string Second { get; set; }
	}
}