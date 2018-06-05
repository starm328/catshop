Simple Ajax
================================

A simple plan for Ajax, with Promise of ES6, AMD supporting.

# Usage

```javascript
Ajax.get( url, params ).when(200,response=>{/*...*/}).when(404,()=>{/*...*/})/*.when(...*/;
```

# All Apis

```javascript
Ajax.get(   url, params={} );
Ajax.post(  url, params={} );
Ajax.put(   url, params={} );
Ajax.patch( url, params={} );

Ajax.OPTIONS( url, header={} );
Ajax.HEAD(    url, header={} );
Ajax.GET(     url, header={} );
Ajax.DELETE(  url, header={} );
Ajax.POST(    url, body, header={} );
Ajax.PUT(     url, body, header={} );
Ajax.PATCH(   url, body, header={} );

```
