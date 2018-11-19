
# Benchmarks

function | v3 | next
---|---|---
space | 249,496 | 1,256,479
width | 1,391,801 | 1,855,123
fontSize | 1,494,500 | 2,476,953
color | 343,100 | 852,665
style | 1,092,995 | 1,014,956
space (array) | 96,000 | 180,680
width (array) | 47,360 | 143,395
fontSize (array) | 136,611 | 259,555
color (array) | 92,694 | 157,926

## v3

```
[@v3.1.11] space x 249,496 ops/sec ±3.40% (83 runs sampled)
[@v3.1.11] width x 1,391,801 ops/sec ±1.05% (86 runs sampled)
[@v3.1.11] fontSize x 1,494,500 ops/sec ±2.04% (86 runs sampled)
[@v3.1.11] color x 343,100 ops/sec ±2.38% (83 runs sampled)
[@v3.1.11] style x 1,092,995 ops/sec ±3.20% (81 runs sampled)
[@v3.1.11] width array x 96,000 ops/sec ±1.72% (84 runs sampled)
[@v3.1.11] width array integer x 128,892 ops/sec ±1.61% (83 runs sampled)
[@v3.1.11] space array x 80,043 ops/sec ±1.70% (84 runs sampled)
[@v3.1.11] fontSize array x 136,611 ops/sec ±1.24% (86 runs sampled)
[@v3.1.11] color array x 92,694 ops/sec ±1.56% (85 runs sampled)
[@v3.1.11] downstream consumer fn x 18,177 ops/sec ±1.25% (84 runs sampled)

```

## next

```
[@next] space x 1,256,479 ops/sec ±1.33% (85 runs sampled)
[@next] width x 1,855,123 ops/sec ±1.41% (87 runs sampled)
[@next] fontSize x 2,476,953 ops/sec ±1.62% (86 runs sampled)
[@next] color x 852,665 ops/sec ±1.09% (88 runs sampled)
[@next] style x 1,014,956 ops/sec ±1.65% (85 runs sampled)
[@next] width array float x 143,395 ops/sec ±1.83% (87 runs sampled)
[@next] width array integer x 239,747 ops/sec ±0.68% (91 runs sampled)
[@next] space array x 180,680 ops/sec ±1.39% (90 runs sampled)
[@next] fontSize array x 259,555 ops/sec ±0.63% (92 runs sampled)
[@next] color array x 157,926 ops/sec ±1.71% (90 runs sampled)
[@next] downstream consumer fn x 28,698 ops/sec ±1.05% (89 runs sampled)

```

## v3

```
[@v3.1.11] space x 258,694 ops/sec ±1.30% (87 runs sampled)
[@v3.1.11] width x 1,451,745 ops/sec ±0.93% (89 runs sampled)
[@v3.1.11] fontSize x 1,541,428 ops/sec ±1.17% (89 runs sampled)
[@v3.1.11] color x 370,857 ops/sec ±0.78% (90 runs sampled)
[@v3.1.11] style x 1,208,775 ops/sec ±1.10% (87 runs sampled)
[@v3.1.11] width array x 112,340 ops/sec ±1.63% (90 runs sampled)
[@v3.1.11] width array integer x 144,254 ops/sec ±0.90% (90 runs sampled)
[@v3.1.11] space array x 94,659 ops/sec ±1.19% (88 runs sampled)
[@v3.1.11] fontSize array x 149,566 ops/sec ±0.91% (91 runs sampled)
[@v3.1.11] color array x 105,742 ops/sec ±1.11% (88 runs sampled)
[@v3.1.11] downstream consumer fn x 20,613 ops/sec ±1.25% (88 runs sampled)
```

## next

```
[@next] space x 1,385,669 ops/sec ±0.74% (89 runs sampled)
[@next] width x 2,006,926 ops/sec ±1.11% (88 runs sampled)
[@next] fontSize x 2,698,443 ops/sec ±0.74% (89 runs sampled)
[@next] color x 843,004 ops/sec ±0.78% (88 runs sampled)
[@next] style x 1,061,756 ops/sec ±1.44% (89 runs sampled)
[@next] width array float x 149,230 ops/sec ±1.76% (90 runs sampled)
[@next] width array integer x 264,286 ops/sec ±0.93% (92 runs sampled)
[@next] space array x 193,828 ops/sec ±0.92% (90 runs sampled)
[@next] fontSize array x 282,295 ops/sec ±0.95% (88 runs sampled)
[@next] color array x 162,019 ops/sec ±0.82% (89 runs sampled)
[@next] downstream consumer fn x 27,716 ops/sec ±1.47% (87 runs sampled)

```

## with env loose option
 ?

