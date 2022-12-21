namespace Backend.Services.IdGenerator
{
    public class IdGenerator : IGenerator
    {
        public int generateId()
        {
            byte[] newGuid = Guid.NewGuid().ToByteArray();

            return Math.Abs(BitConverter.ToInt32(newGuid, 0));
        }
    }
}
