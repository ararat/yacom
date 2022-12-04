---
title: 'Stress Testing customisations on AEM Author with Siege'
date: '2017-05-09T16:45:26+12:00'
status: publish
permalink: /2017/05/stress-testing-customisations-on-aem-author-with-siege
author: 'Yuval Ararat'
excerpt: ''
type: post
id: 1431
thumbnail: ''
category:
    - Adobe
    - AEM
    - 'Content Management'
    - CQ
    - 'Experience Manager'
    - Performance
tag:
    - AEM
    - 'Digital Marketing'
    - 'Digital Media'
    - 'Experience Manager'
post_format: []
---
Turns out most of you want to make sure your server will deal with your complex authoring requirements and data structures. In a general sense if you wish to test the capability of your server in reference to the infrastructure and baseline it you should go and run [ToughDay](https://docs.adobe.com/docs/en/aem/6-3/develop/test/tough-day.html) and feel all warm and fuzzy. This is a great practice and has been tried and tested many times in many clients proving to have successfully indicated the performance of the system.

But if you are here, you are not looking for the default best practice but a solution to your need, stress testing on small-scale of your code to make sure you wrote something that does not kill the server. It might be a servlet, or a renderer or anything you wish to run on any of your environment. well let me

Siege is a stress testing tool for single URL through bash. if you have not used it in the past read about it [here](https://www.joedog.org/siege-home/). it is old, but it is also simple and that is its value in the KISS development process.

I truly enjoy it as it allows me to have some insight into a few areas while i develop, simple way of stressing a servlet i just wrote to see if i have memory leaks or ill affects on Tar growth or just watching my server response time as i run maintanance. During the years i found many benefits to it in a small-scale developer scenario.

In edge cases where i know that there is a page that is giving grief on a production environment using Siege has been quite useful, you easily simulate a load in a different AEM instance with the production code and content.

Made some tough to negotiate situations much easier with a quick insight into the problem in an instance you can monitor closely through JMX etc.  
All from a command in Terminal whilst you watch the calls go by

When encountering AEM Author performance degradation i have encountered a few hiccups on how i can pass the credentials to siege to make this work.

The most reliable way i found to get the login going was through the config file, depending on the version you installed it will be in different locations. my local make got a /usr/local/bin/siege.config file whilst the ones from brew will get a Cellar location with a siegerc file.

Either way the file format is consistent on all if you are in the latest version (2012 vintage..)

Sample is here https://github.com/JoeDog/siege/blob/master/doc/siegerc.in

I add both the following changes to make sure the login works, you could also use the last login to work as part of the [URL list](https://www.joedog.org/siege-manual/#a05) you want the Siege client to run against.

- ` login = admin:admin `
- ` login-url = http://localhost:4502/libs/granite/core/content/login.html/j_security_check POST _charset_=utf-8&amp;j_username=admin&amp;j_password=admin&amp;j_=true`

In the configuration you could also add SSL and Proxy when needed.

Hope this is helpful.

` `