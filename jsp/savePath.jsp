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
	String path = request.getParameter("path"); // path ="hello!你好！";	
	
	// 生成文件名称
	String thisFileNamePath = application.getRealPath(".") + request.getServletPath(); // out.println(thisFileNamePath);
	String curDir = new File(thisFileNamePath).getParent(); // out.println(curDir); 
	String fileName = (new File(curDir).getParent())  + "\\data\\path-" + id; // out.println(fileName);

	// 删除已经存在的文件
	File f = new File(fileName);
	if (f.exists()) { //文件存在就删除
		boolean flag = f.delete();		
		if (!flag) {
			out.print("无法删除已存在文件:" + fileName);
			return;
		}			
	}	
	
	// 写入文件
	BufferedWriter bw = null;
	try {
		bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName),"UTF-8"));
		bw.write(path);
		
		// 返回成功
		out.print("true");
	} catch (Exception e) {
		out.print("文件写入失败：" + e.toString());
	} finally {
		if (null != bw) bw.close();
	}
%>
