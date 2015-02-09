using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Writer.Models
{
	[DataContract]
	public abstract class AppEntity : IEntity
	{
		[Key, DataMember]
		public int Id { get; set; }

		public DateTime CreatedDate { get; set; }

		public DateTime? UpdatedDate { get; set; }
	}
}