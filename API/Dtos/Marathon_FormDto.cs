namespace API.Dtos
{
    public class Marathon_FormDto
    {
        public int Record_ID { get; set; }
        public string Full_Name { get; set; }
        public DateTime Date_Of_Birth { get; set; }
        public bool Gender { get; set; }
        public string Address { get; set; }
        public string Phone_Number { get; set; }
        public string Email_Address { get; set; }
        public TimeSpan From_Time { get; set; }
        public TimeSpan To_Time { get; set; }
        public decimal Distance { get; set; }
        public DateTime Created_Time { get; set; }
        public string Created_By { get; set; }
        public DateTime? Updated_Time { get; set; }
        public string Updated_By { get; set; }
        public bool Status { get; set; }
    }
}