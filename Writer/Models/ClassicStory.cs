using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Writer.Models
{
	[DataContract]
	public class ClassicStory
	{
		[Key, DataMember]
		public int Id { get; set; }

		[DataMember]
		public string First { get; set; }
		
		[DataMember]
		public string Second { get; set; }
	}
}