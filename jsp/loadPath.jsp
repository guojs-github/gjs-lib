/*
	米思米项目演示，保存路径
	2017.4.17 GuoJS
*/
<!DOCTYPE HTML>
<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.io.*"%>
<%
	// 清除输出信息
	out.clear(); 
	// 读取参数
	String id = request.getParameter("id"); // id ="100";
	
	// 生成文件名称
	String thisFileNamePath = application.getRealPath(".") + request.getServletPath(); // out.println(thisFileNamePath);
	String curDir = new File(thisFileNamePath).getParent(); // out.println(curDir); 
	String fileName = (new File(curDir).getParent())  + "\\data\\path-" + id; // out.println(fileName);

	// 删除已经存在的文件
	File f = new File(fileName);
	if (!f.exists()) { //文件存在就删除
		out.print("文件不存在:" + fileName);
		return;
	}	
	
	// 读取文件
	BufferedReader br = null;
	String path = null;
	String line = null;
	try {
		br = new BufferedReader(new InputStreamReader(new FileInputStream(fileName)));
		path = "";
		while (null != (line = br.readLine())) {
			path += line;
		}
				
		// 返回成功
		out.print(path);
	} catch (Exception e) {
		out.print("文件读取失败：" + e.toString());
	} finally {
		if (null != br) br.close();
		br = null;
		line = null;
		path = null;
	}
%>
