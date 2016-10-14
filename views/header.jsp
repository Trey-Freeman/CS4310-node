<%-- 
    Document   : header
    Created on : Feb 10, 2016, 3:50:52 PM
    Author     : Simi510
--%>
<!DOCTYPE html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>
<head>
    
    <meta name="generator" content=
  "HTML Tidy for Linux/x86 (vers 25 March 2009), see www.w3.org" />

  <title>Harsimranjeet Singh</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- Latest compiled and minified CSS -->
  
  <script src="include/js/jquery-1.12.0.min.js" type="text/javascript">
</script><!-- Latest compiled JavaScript -->
  
  
 <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" type="text/css" />
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" type="text/css" />
  <link rel="stylesheet" href="include/styles/main.css" type="text/css" />
  <%-- <link rel="stylesheet" href="include/styles/bootstrap.css" type="text/css" />> --%>
      

  
  <!-- jQuery library -->



  <script src="include/js/bootstrap.min.js" type="text/javascript">
</script>

 

 

<a href="${pageContext.request.contextPath}">
<img src="${pageContext.request.contextPath}/include/header.png" class="img-responsive"  id= "head"  alt="Responsive image" />
</a>
  
    
  <nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="index.jsp">Simi's Website</a>
    </div>
    <ul class="nav navbar-nav">
      <li><a href="index.jsp">Index</a></li>
      <c:if test ="${sessionScope.User.username!=null}">
      <li><a href="map.jsp">Quote</a></li>
      </c:if>
      <li><a href="directions.jsp">Directions</a></li>
      <li><a href="join.jsp">Mailing List</a></li>
      <li><a href="contact.jsp">Contact Us</a></li>
      </ul>

       <c:if test="${isAdmin == true}">
      <ul class="nav navbar-nav navbar-left">
          <%--  <li><a href="admin.jsp">Admin</a></li> --%>
      <li><a href="home.jsp">Admin</a></li>
      </ul>
      </c:if>
      
      <ul class="nav navbar-nav navbar-right">

           <c:if test ="${sessionScope.User.username!=null}">      
               <p class="navbar-text">Signed in as <a href="#" class="navbar-link"><b>${sessionScope.User.username== null ? 'guest' : sessionScope.User.username }</b></a></p>
             </c:if> 
             
           <li><a href="signup.jsp"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>      
          
          <%--<li><p class="navbar-text"> </p> </li> --%>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b><span class="glyphicon glyphicon-log-in"></span> Login</b> <span class="caret"></span></a>
			<ul id="login-dp" class="dropdown-menu">
				<li>
					 <div class="row">
							<div class="col-md-12">
								Vist social media
								<div class="social-buttons">
									<a href="https://www.facebook.com/" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
									<a href="https://twitter.com/" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
								</div>
                                or
								 <form class="form" role="form" method="post" action="loginAccount" accept-charset="UTF-8" id="login-nav">
									<input type="hidden" name="formType"  value="login" />
                                                                     <div class="form-group">
											 <label class="sr-only" >Username</label>
											 <input name="username" type="text" class="form-control"  placeholder="Username" required>
										</div>
										<div class="form-group">
											 <label class="sr-only" for="exampleInputPassword2">Password</label>
											 <input name="password" type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" required>
                                             <div class="help-block text-right"><a href="contact.jsp">Forget the password ?</a></div>
										</div>
										<div class="form-group">
											 <button type="submit" class="btn btn-primary btn-block">Sign in</button>
										</div>
										<div class="checkbox">
											 <label>
											 <input type="checkbox"> keep me logged-in
											 </label>
										</div>
								 </form>
							</div>
							<div class="bottom text-center">
								New here ? <a href="signup.jsp"><b>Join Us</b></a>
							</div>
					 </div>
				</li>
			</ul>
        </li>
        <li><a href="/CS3520/Logout"><span class="glyphicon glyphicon-off"></span><b> Logout</b></a></li>  
      
          
          
          
          
          
      <%-- <li><a href="login.jsp"><span class="glyphicon glyphicon-log-in"></span> Login</a></li> --%>
    </ul>
      
    
  </div>
</nav>
    
    <script>
 var url = window.location;
// Will only work if string in href matches with location
$('ul.nav a[href="'+ url +'"]').parent().addClass('active');

// Will also work for relative and absolute hrefs
$('ul.nav a').filter(function() {
    return this.href == url;
}).parent().addClass('active');
    </script>
    
</head>
<body>
