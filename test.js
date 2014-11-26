
function *good() {
    console.log('test0');
    yield 1;
    console.log('test1');
}
console.log('test');
var go = good();
go.next();
go.next();