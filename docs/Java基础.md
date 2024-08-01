---
title: Java基础
author: Triabin
createTime: 2024/08/01 15:03:29
permalink: /article/w35s1n35/
---
# Java基础

## 基础概念

1. 解释Java中的多线程以及如何实现它。
2. 描述Java内存模型，特别是堆和栈的区别。
3. 什么事Java中的接口和抽象类，它们之间的区别是什么？
4. 解释Java中的异常处理机制，并给出一个实际应用的例子。

## 集合框架

1. 详细解释ArrayList和LinkedList的数据结构以及性能差异。
2. 如何实现HashMap的自定义排序？
3. 解释迭代器（Iterator）和列表迭代器（ListIterator）的区别。

## 泛型与类型擦除

1. 泛型的好处是什么？
2. Java中的泛型是完全类型安全的吗？为什么？

## 并发与多线程

1. 什么是死锁？如何避免死锁？
2. 解释并比较synchronized关键字与Lock接口的使用。
3. Java中的volatile关键字的作用是什么？它与synchronized的区别在哪里？

## JVM与性能优化

1. 简述JVM的内存区域划分。
2. 如何通过JVM参数进行性能调优？
3. 什么事垃圾回收（GC），并简述几种常见的GC算法。

## 设计模式

1. 解释单例模式并用Java实现。
2. 举例说明工厂模式和抽象工厂模式的应用场景及实现。

## 数据库与JDBC

1. JDBC的基本操作流程是什么？如何处理SQLException？
2. 解释PreparedStatement与Statement的区别，并指出哪个更安全、性能更好。

## 框架与库

1. Spring框架的核心特性有哪些？
2. 解释依赖注入（DI）和控制反转（IoC）的概念。

## SpringMVC的理解

**概念：**SpringMVC是一种基于Java语言开发，实现了Web MVC设计模式，请求驱动类型的轻量级Web框架。<br/>采用了MVC架构模式的思想，通过吧Model，View，Controller分离，将Web层进行职责解耦从而把复杂的Web应用分成逻辑清晰的几个组件，在SpriingMVC中有9大重要的组件：

1. MultipartResolver文件处理器

   对应的初始化方法是`initMultipartResolver(context)`，用于处理上传请求。

2. LocaleResolver当前换将处理器

   对应的初始化方法是``initLocaleResolver(context)`，SpringMVC主要有两个地方用到了Locale，一个是ViewResolver视图解析的时候；二是用到国际化资源或者主题的时候。

3. ThemeResolver主热处理器

   其对应的初始化方法是`initThemeResolver(context)`，用于解析主题，也就是解析样式、图片及它们所形成的显示效果的集合。

4. HandlerMapping处理器映射器

   其对应的初始化方法是`initHandlerMappings(context)`，在SpringMVC中会有很多请求，每个请求都需要一个Handler处理，HandlerMapping的作用便是找到请求响应的处理器Handler和Interceptor。

5. HandlerAdapter处理器适配器

   对应的初始化方法是`initHandlerAdapers(context)`，从名字上看，它就是一个适配器，HandlerAdapters主要做的事情就是如何让固定的Servlet处理方法调用灵活的Handler来进行处理。

6. HandlerExceptionResolver异常处理器

   它对应的初始化方法是`initHandlerExceptionResolvers(context)`，它的主要作用是处理其他组件产生的异常情况。

7. RequestToViewNameTranslator视图名称翻译器

   其对应的初始化方法是`initRequestToViewNameTranslator(context)`，它的作用是从请求中获取ViewName，有的Handler处理完后并没有设置View，也没有设置ViewName，这时就需要从request中获取，而RequestToViewTranslator就是为request提供狭取ViewName的实现。

8. ViewResolvers页面洁染处理器

   其对应的初始化方法是`initViewResolvers(context)`，ViewResolvers的主要作用是将String类型的视图名和Locale解析为View类型的视图。

9. FlashMapManager参数传递管理器

   其对应的初始化方法是`initFlashMapManager(context)`，在实际应用中，为了避免重复提交，我们可以在处理完post请求后重定向到另一个get请求，这个get请求可以用来返回页面青染需要的信息，FlashMap就是用于这种请求重定向场景中的参数传递。

**请求工作流程：**在SpringMVC的九大组件中，涉及请求处理响应的核心组件分别是HandlerMapping、HandlerAdapter、ViewResolver。下图为一次完整的请求中，SpringMVC的完整工作流程：

![image-20240731233316947](https://gitee.com/triabin/img_bed/raw/master/2024/07/31/9739e6074b0852fb322829a82833097b-image-20240731233316947.png)

HandlerMapping回调用HandlerAdapter，HandlerAdapter会返回ModelAndView，ModelAndView根据用户传入的参数封装为View，交给引擎进行清染。

> 注意：ModelAndView和View不属于SpringMVC九大组件。
