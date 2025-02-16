import postcss from 'postcss'
import { parseSourceMaps } from './util/source-maps'
import { crosscheck, runWithSourceMaps as run, html, css, map } from './util/run'

crosscheck(({ stable, oxide }) => {
  oxide.test.todo('apply generates source maps')
  stable.test('apply generates source maps', async () => {
    let config = {
      content: [
        {
          raw: html`
            <div class="with-declaration"></div>
            <div class="with-comment"></div>
            <div class="just-apply"></div>
          `,
        },
      ],
      corePlugins: { preflight: false },
    }

    let input = css`
      .with-declaration {
        background-color: red;
        @apply h-4 w-4 bg-green-500;
      }

      .with-comment {
        /* sourcemap will work here too */
        @apply h-4 w-4 bg-red-500;
      }

      .just-apply {
        @apply h-4 w-4 bg-black;
      }
    `

    let result = await run(input, config)
    let { sources, annotations } = parseSourceMaps(result)

    // All CSS generated by Tailwind CSS should be annotated with source maps
    // And always be able to point to the original source file
    expect(sources).not.toContain('<no source>')
    expect(sources.length).toBe(1)

    expect(annotations).toEqual([
      '2:6 -> 2:6',
      '3:8-29 -> 3:8-29',
      '4:8-35 -> 4:8-20',
      '4:8-35 -> 5:8-19',
      '4:8-35 -> 6:8-26',
      '4:8-35 -> 7:8-63',
      '5:6 -> 8:6',
      '7:6 -> 10:6',
      '8:8-41 -> 11:8-41',
      '9:8-33 -> 12:8-20',
      '9:8-33 -> 13:8-19',
      '9:8-33 -> 14:8-26',
      '9:8-33 -> 15:8-63',
      '10:6 -> 16:6',
      '13:8 -> 18:6',
      '13:8-31 -> 19:8-20',
      '13:8-31 -> 20:8-19',
      '13:8-31 -> 21:8-26',
      '13:8 -> 22:8',
      '13:31 -> 23:0',
    ])
  })

  oxide.test.todo('preflight + base have source maps')
  stable.test('preflight + base have source maps', async () => {
    let config = {
      content: [],
    }

    let input = css`
      @tailwind base;
    `

    let result = await run(input, config)
    let { sources, annotations } = parseSourceMaps(result)

    // All CSS generated by Tailwind CSS should be annotated with source maps
    // And always be able to point to the original source file
    expect(sources).not.toContain('<no source>')
    expect(sources.length).toBe(1)

    expect(annotations).toEqual([
      '2:6 -> 1:0',
      '2:20-6 -> 3:1-2',
      '2:20 -> 6:1',
      '2:6 -> 8:0',
      '2:6-20 -> 11:2-32',
      '2:6-20 -> 12:2-25',
      '2:6-20 -> 13:2-29',
      '2:6-20 -> 14:2-31',
      '2:20 -> 15:0',
      '2:6 -> 17:0',
      '2:6-20 -> 19:2-18',
      '2:20 -> 20:0',
      '2:6 -> 22:0',
      '2:20 -> 30:1',
      '2:6 -> 32:0',
      '2:6-20 -> 34:2-26',
      '2:6-20 -> 35:2-40',
      '2:6-20 -> 36:2-26',
      '2:6-20 -> 37:2-21',
      '2:6-20 -> 38:2-137',
      '2:6-20 -> 39:2-39',
      '2:6-20 -> 40:2-41',
      '2:6-20 -> 41:2-50',
      '2:20 -> 42:0',
      '2:6 -> 44:0',
      '2:20 -> 47:1',
      '2:6 -> 49:0',
      '2:6-20 -> 50:2-19',
      '2:6-20 -> 51:2-30',
      '2:20 -> 52:0',
      '2:6 -> 54:0',
      '2:20 -> 58:1',
      '2:6 -> 60:0',
      '2:6-20 -> 61:2-19',
      '2:6-20 -> 62:2-24',
      '2:6-20 -> 63:2-31',
      '2:20 -> 64:0',
      '2:6 -> 66:0',
      '2:20 -> 68:1',
      '2:6 -> 70:0',
      '2:6-20 -> 71:2-35',
      '2:20 -> 72:0',
      '2:6 -> 74:0',
      '2:20 -> 76:1',
      '2:6 -> 78:0',
      '2:6-20 -> 84:2-20',
      '2:6-20 -> 85:2-22',
      '2:20 -> 86:0',
      '2:6 -> 88:0',
      '2:20 -> 90:1',
      '2:6 -> 92:0',
      '2:6-20 -> 93:2-16',
      '2:6-20 -> 94:2-26',
      '2:20 -> 95:0',
      '2:6 -> 97:0',
      '2:20 -> 99:1',
      '2:6 -> 101:0',
      '2:6-20 -> 103:2-21',
      '2:20 -> 104:0',
      '2:6 -> 106:0',
      '2:20 -> 111:1',
      '2:6 -> 113:0',
      '2:6-20 -> 117:2-121',
      '2:6-20 -> 118:2-39',
      '2:6-20 -> 119:2-41',
      '2:6-20 -> 120:2-24',
      '2:20 -> 121:0',
      '2:6 -> 123:0',
      '2:20 -> 125:1',
      '2:6 -> 127:0',
      '2:6-20 -> 128:2-16',
      '2:20 -> 129:0',
      '2:6 -> 131:0',
      '2:20 -> 133:1',
      '2:6 -> 135:0',
      '2:6-20 -> 137:2-16',
      '2:6-20 -> 138:2-16',
      '2:6-20 -> 139:2-20',
      '2:6-20 -> 140:2-26',
      '2:20 -> 141:0',
      '2:6 -> 143:0',
      '2:6-20 -> 144:2-17',
      '2:20 -> 145:0',
      '2:6 -> 147:0',
      '2:6-20 -> 148:2-13',
      '2:20 -> 149:0',
      '2:6 -> 151:0',
      '2:20 -> 155:1',
      '2:6 -> 157:0',
      '2:6-20 -> 158:2-24',
      '2:6-20 -> 159:2-31',
      '2:6-20 -> 160:2-35',
      '2:20 -> 161:0',
      '2:6 -> 163:0',
      '2:20 -> 167:1',
      '2:6 -> 169:0',
      '2:6-20 -> 174:2-30',
      '2:6-20 -> 175:2-40',
      '2:6-20 -> 176:2-42',
      '2:6-20 -> 177:2-25',
      '2:6-20 -> 178:2-30',
      '2:6-20 -> 179:2-30',
      '2:6-20 -> 180:2-24',
      '2:6-20 -> 181:2-19',
      '2:6-20 -> 182:2-20',
      '2:20 -> 183:0',
      '2:6 -> 185:0',
      '2:20 -> 187:1',
      '2:6 -> 189:0',
      '2:6-20 -> 191:2-22',
      '2:20 -> 192:0',
      '2:6 -> 194:0',
      '2:20 -> 197:1',
      '2:6 -> 199:0',
      '2:6-20 -> 203:2-36',
      '2:6-20 -> 204:2-39',
      '2:6-20 -> 205:2-32',
      '2:20 -> 206:0',
      '2:6 -> 208:0',
      '2:20 -> 210:1',
      '2:6 -> 212:0',
      '2:6-20 -> 213:2-15',
      '2:20 -> 214:0',
      '2:6 -> 216:0',
      '2:20 -> 218:1',
      '2:6 -> 220:0',
      '2:6-20 -> 221:2-18',
      '2:20 -> 222:0',
      '2:6 -> 224:0',
      '2:20 -> 226:1',
      '2:6 -> 228:0',
      '2:6-20 -> 229:2-26',
      '2:20 -> 230:0',
      '2:6 -> 232:0',
      '2:20 -> 234:1',
      '2:6 -> 236:0',
      '2:6-20 -> 238:2-14',
      '2:20 -> 239:0',
      '2:6 -> 241:0',
      '2:20 -> 244:1',
      '2:6 -> 246:0',
      '2:6-20 -> 247:2-39',
      '2:6-20 -> 248:2-30',
      '2:20 -> 249:0',
      '2:6 -> 251:0',
      '2:20 -> 253:1',
      '2:6 -> 255:0',
      '2:6-20 -> 256:2-26',
      '2:20 -> 257:0',
      '2:6 -> 259:0',
      '2:20 -> 262:1',
      '2:6 -> 264:0',
      '2:6-20 -> 265:2-36',
      '2:6-20 -> 266:2-23',
      '2:20 -> 267:0',
      '2:6 -> 269:0',
      '2:20 -> 271:1',
      '2:6 -> 273:0',
      '2:6-20 -> 274:2-20',
      '2:20 -> 275:0',
      '2:6 -> 277:0',
      '2:20 -> 279:1',
      '2:6 -> 281:0',
      '2:6-20 -> 294:2-11',
      '2:20 -> 295:0',
      '2:6 -> 297:0',
      '2:6-20 -> 298:2-11',
      '2:6-20 -> 299:2-12',
      '2:20 -> 300:0',
      '2:6 -> 302:0',
      '2:6-20 -> 303:2-12',
      '2:20 -> 304:0',
      '2:6 -> 306:0',
      '2:6-20 -> 309:2-18',
      '2:6-20 -> 310:2-11',
      '2:6-20 -> 311:2-12',
      '2:20 -> 312:0',
      '2:6 -> 314:0',
      '2:20 -> 316:1',
      '2:6 -> 317:0',
      '2:6-20 -> 318:2-12',
      '2:20 -> 319:0',
      '2:6 -> 321:0',
      '2:20 -> 323:1',
      '2:6 -> 325:0',
      '2:6-20 -> 326:2-18',
      '2:20 -> 327:0',
      '2:6 -> 329:0',
      '2:20 -> 332:1',
      '2:6 -> 334:0',
      '2:6-20 -> 336:2-20',
      '2:6-20 -> 337:2-24',
      '2:20 -> 338:0',
      '2:6 -> 340:0',
      '2:20 -> 342:1',
      '2:6 -> 344:0',
      '2:6-20 -> 346:2-17',
      '2:20 -> 347:0',
      '2:6 -> 349:0',
      '2:20 -> 351:1',
      '2:6 -> 352:0',
      '2:6-20 -> 353:2-17',
      '2:20 -> 354:0',
      '2:6 -> 356:0',
      '2:20 -> 360:1',
      '2:6 -> 362:0',
      '2:6-20 -> 370:2-24',
      '2:6-20 -> 371:2-32',
      '2:20 -> 372:0',
      '2:6 -> 374:0',
      '2:20 -> 376:1',
      '2:6 -> 378:0',
      '2:6-20 -> 380:2-17',
      '2:6-20 -> 381:2-14',
      '2:20 -> 382:0',
      '2:6-20 -> 384:0-72',
      '2:6 -> 385:0',
      '2:6-20 -> 386:2-15',
      '2:20 -> 387:0',
      '2:6 -> 389:0',
      '2:6-20 -> 390:2-26',
      '2:6-20 -> 391:2-26',
      '2:6-20 -> 392:2-21',
      '2:6-20 -> 393:2-21',
      '2:6-20 -> 394:2-16',
      '2:6-20 -> 395:2-16',
      '2:6-20 -> 396:2-16',
      '2:6-20 -> 397:2-17',
      '2:6-20 -> 398:2-17',
      '2:6-20 -> 399:2-15',
      '2:6-20 -> 400:2-15',
      '2:6-20 -> 401:2-20',
      '2:6-20 -> 402:2-40',
      '2:6-20 -> 403:2-32',
      '2:6-20 -> 404:2-31',
      '2:6-20 -> 405:2-30',
      '2:6-20 -> 406:2-17',
      '2:6-20 -> 407:2-22',
      '2:6-20 -> 408:2-24',
      '2:6-20 -> 409:2-25',
      '2:6-20 -> 410:2-26',
      '2:6-20 -> 411:2-20',
      '2:6-20 -> 412:2-29',
      '2:6-20 -> 413:2-30',
      '2:6-20 -> 414:2-40',
      '2:6-20 -> 415:2-36',
      '2:6-20 -> 416:2-29',
      '2:6-20 -> 417:2-24',
      '2:6-20 -> 418:2-32',
      '2:6-20 -> 419:2-14',
      '2:6-20 -> 420:2-20',
      '2:6-20 -> 421:2-18',
      '2:6-20 -> 422:2-19',
      '2:6-20 -> 423:2-20',
      '2:6-20 -> 424:2-16',
      '2:6-20 -> 425:2-18',
      '2:6-20 -> 426:2-15',
      '2:6-20 -> 427:2-21',
      '2:6-20 -> 428:2-23',
      '2:6-20 -> 429:2-29',
      '2:6-20 -> 430:2-27',
      '2:6-20 -> 431:2-28',
      '2:6-20 -> 432:2-29',
      '2:6-20 -> 433:2-25',
      '2:6-20 -> 434:2-26',
      '2:6-20 -> 435:2-27',
      '2:6 -> 436:2',
      '2:20 -> 437:0',
      '2:6 -> 439:0',
      '2:6-20 -> 440:2-26',
      '2:6-20 -> 441:2-26',
      '2:6-20 -> 442:2-21',
      '2:6-20 -> 443:2-21',
      '2:6-20 -> 444:2-16',
      '2:6-20 -> 445:2-16',
      '2:6-20 -> 446:2-16',
      '2:6-20 -> 447:2-17',
      '2:6-20 -> 448:2-17',
      '2:6-20 -> 449:2-15',
      '2:6-20 -> 450:2-15',
      '2:6-20 -> 451:2-20',
      '2:6-20 -> 452:2-40',
      '2:6-20 -> 453:2-32',
      '2:6-20 -> 454:2-31',
      '2:6-20 -> 455:2-30',
      '2:6-20 -> 456:2-17',
      '2:6-20 -> 457:2-22',
      '2:6-20 -> 458:2-24',
      '2:6-20 -> 459:2-25',
      '2:6-20 -> 460:2-26',
      '2:6-20 -> 461:2-20',
      '2:6-20 -> 462:2-29',
      '2:6-20 -> 463:2-30',
      '2:6-20 -> 464:2-40',
      '2:6-20 -> 465:2-36',
      '2:6-20 -> 466:2-29',
      '2:6-20 -> 467:2-24',
      '2:6-20 -> 468:2-32',
      '2:6-20 -> 469:2-14',
      '2:6-20 -> 470:2-20',
      '2:6-20 -> 471:2-18',
      '2:6-20 -> 472:2-19',
      '2:6-20 -> 473:2-20',
      '2:6-20 -> 474:2-16',
      '2:6-20 -> 475:2-18',
      '2:6-20 -> 476:2-15',
      '2:6-20 -> 477:2-21',
      '2:6-20 -> 478:2-23',
      '2:6-20 -> 479:2-29',
      '2:6-20 -> 480:2-27',
      '2:6-20 -> 481:2-28',
      '2:6-20 -> 482:2-29',
      '2:6-20 -> 483:2-25',
      '2:6-20 -> 484:2-26',
      '2:6-20 -> 485:2-27',
      '2:6 -> 486:2',
      '2:20 -> 487:0',
    ])
  })

  oxide.test.todo('utilities have source maps')
  stable.test('utilities have source maps', async () => {
    let config = {
      content: [{ raw: `text-red-500` }],
    }

    let input = css`
      @tailwind utilities;
    `

    let result = await run(input, config)
    let { sources, annotations } = parseSourceMaps(result)

    // All CSS generated by Tailwind CSS should be annotated with source maps
    // And always be able to point to the original source file
    expect(sources).not.toContain('<no source>')
    expect(sources.length).toBe(1)

    expect(annotations).toStrictEqual([
      '2:6 -> 1:0',
      '2:6-25 -> 2:4-24',
      '2:6 -> 3:4',
      '2:25 -> 4:0',
    ])
  })

  oxide.test.todo('components have source maps')
  stable.test('components have source maps', async () => {
    let config = {
      content: [{ raw: `container` }],
    }

    let input = css`
      @tailwind components;
    `

    let result = await run(input, config)
    let { sources, annotations } = parseSourceMaps(result)

    // All CSS generated by Tailwind CSS should be annotated with source maps
    // And always be able to point to the original source file
    expect(sources).not.toContain('<no source>')
    expect(sources.length).toBe(1)

    expect(annotations).toEqual([
      '2:6 -> 1:0',
      '2:6 -> 2:4',
      '2:26 -> 3:0',
      '2:6 -> 4:0',
      '2:6 -> 5:4',
      '2:6 -> 6:8',
      '2:26 -> 7:4',
      '2:26 -> 8:0',
      '2:6 -> 9:0',
      '2:6 -> 10:4',
      '2:6 -> 11:8',
      '2:26 -> 12:4',
      '2:26 -> 13:0',
      '2:6 -> 14:0',
      '2:6 -> 15:4',
      '2:6 -> 16:8',
      '2:26 -> 17:4',
      '2:26 -> 18:0',
      '2:6 -> 19:0',
      '2:6 -> 20:4',
      '2:6 -> 21:8',
      '2:26 -> 22:4',
      '2:26 -> 23:0',
      '2:6 -> 24:0',
      '2:6 -> 25:4',
      '2:6 -> 26:8',
      '2:26 -> 27:4',
      '2:26 -> 28:0',
    ])
  })

  oxide.test.todo('source maps for layer rules are not rewritten to point to @tailwind directives')
  stable.test(
    'source maps for layer rules are not rewritten to point to @tailwind directives',
    async () => {
      let config = {
        content: [{ raw: `font-normal foo hover:foo lg:foo` }],
      }

      let utilitiesFile = postcss.parse(
        css`
          @tailwind utilities;
        `,
        { from: 'components.css', map: { prev: map } }
      )

      let mainCssFile = postcss.parse(
        css`
          @layer utilities {
            .foo {
              background-color: red;
            }
          }
        `,
        { from: 'input.css', map: { prev: map } }
      )

      // Just pretend that there's an @import in `mainCssFile` that imports the nodes from `utilitiesFile`
      let input = postcss.root({
        nodes: [...utilitiesFile.nodes, ...mainCssFile.nodes],
        source: mainCssFile.source,
      })

      let result = await run(input, config)

      let { sources, annotations } = parseSourceMaps(result)

      // All CSS generated by Tailwind CSS should be annotated with source maps
      // And always be able to point to the original source file
      expect(sources).not.toContain('<no source>')

      // And we should see that the source map for the layer rule is not rewritten
      // to point to the @tailwind directive but instead points to the original
      expect(sources.length).toBe(2)
      expect(sources).toEqual(['components.css', 'input.css'])

      expect(annotations).toEqual([
        '2:10 -> 1:0',
        '2:10 -> 2:14',
        '2:29 -> 3:0',
        '3:12 -> 4:12',
        '4:14-35 -> 5:14-35',
        '5:12 -> 6:12',
        '3:12 -> 7:12',
        '4:14-35 -> 8:14-35',
        '5:12 -> 9:12',
        '1:0 -> 10:12',
        '3:12 -> 11:12',
        '4:14-35 -> 12:14-35',
        '5:12 -> 13:12',
        '1:0 -> 14:0',
      ])
    }
  )
})
