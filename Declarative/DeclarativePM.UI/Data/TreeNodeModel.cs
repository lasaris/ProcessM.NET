namespace DeclarativePM.UI.Data
{
    public class TreeNodeModel
    {
        public string Name { get; set; }
        public TreeNodeModel[] Nodes { get; set; } = new TreeNodeModel[0];
    }
}