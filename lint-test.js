(()=>{
	'use strict';

	class Foo
	{
		foo

		bar

		constuctor( foo, bar )
		{
			this.foo= foo;
			this.bar= bar;
		}

		setFoo( foo )
		{
			this.foo= foo;
		}

		getFoo()
		{
			return this.foo;
		}
	}

	return {
		Foo,
	};
})();
