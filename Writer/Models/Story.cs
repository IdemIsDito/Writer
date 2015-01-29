using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Writer.Models
{
	[DataContract]
	public class Story
	{
		[Key, DataMember]
		public int Id { get; set; }

		[DataMember]
		public string First { get; set; }
	}
}