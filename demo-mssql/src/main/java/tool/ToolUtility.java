package tool;

public class ToolUtility {

	public static StringBuilder printReqData(int state, String className, String methodName, String reqData) {
		StringBuilder sb = new StringBuilder();

		sb.append("Go through > ");
		sb.append(className);
		sb.append(" > ");
		sb.append(methodName);
		sb.append(" > ");
		sb.append(reqData);
		if (1 == state) {
			sb.append("---Start");
		} else if (0 == state) {
			sb.append("---End");
		}
		System.out.println(sb.toString());

		return sb;
	}
}
