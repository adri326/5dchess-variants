# 5D Chess variant and puzzle repository

This is a repository of user-submitted variants and puzzles for the game [5D Chess with Multiverse Time Travel](https://5dchessiwhtmultiversetimetravel.com/).
These are saved in [the 5DPGN + 5DFEN format](https://github.com/adri326/5dchess-notation).

The repository is organized as follows:

## Variants

Variants should go in the `base/` or `community/` folder, depending on whether or not it is part of the base game.
The direcotry structure is recursive, with `A - B - C` corresponding to `A/B/C` directory-wise.
The PGN should be put in a file called `variant.5dpgn` within the variant's sub-folder, and follow the following template:

```pgn
[Board "custom"]
[Mode "5D"]
{Please leave the above tags as-is and edit the information below:}
[VariantName "Your Variant Name"] {This should be the same name as the directory name}
[Promotions "Q,N,R,B"]
[InitialMultiverses "0"] {space-separated list of initial timeline indices}
[r*nbqk*bnr*/p*p*p*p*p*p*p*p*/8/8/8/8/P*P*P*P*P*P*P*P*/R*NBQK*BNR*:0:1:w]

{Prefer inputting moves here rather than duplicating 5DFEN boards}
```

You may put comments and analysis of different lines in separate files.

### Submitting

You should fork this repository and clone it on your computer (or directly put the files from the website client).
Then, open a pull request. Be sure to mention the name of the variant(s) in the pull request's body.

You may also submit pull requests to suggest modifications or corrections to existing variants.
These pull requests should not introduce new variants.

You can use any tool to generate and edit the 5DFEN (you can try out [5dchess-designer](https://adri326.github.io/5dchess-designer/)), as long as the `variant.5dpgn` files included in the pull requests are valid 5DPGN+5DFEN files and follow the formatting guidelines described below.

If you do not know how to properly format your variant or are having trouble with creating a Pull Request, you may [open an issue instead](https://github.com/adri326/5dchess-variants/issues/new?assignees=&labels=suggestion&template=variant-suggestion.md&title=Suggestion%3A+%28Your+variant+name%29).

### Formatting guidelines

The `variant.5dpgn` file should follow the following guidelines, which are here to make reading and parsing the variants easier:

- It should not contain any comment (enclosed within curly braces: `{}`; comments should go in a separate file)
- If there are moves, they should be separated from the header by exactly one blank line <!-- TODO: have them follow the raw format? -->
- White should play first
- Timelines should be described from the center to the outside, with the following order:
  - For odd starting timelines: `0`, `-1`, `1`, `-2`, `2`, etc.
  - For even starting timelines: `+0`, `-0`, `1`, `-1`, `2`, `-2`, `3`, etc.
- If a timeline has multiple starting boards (eg. `Standard - Turn Zero`), the boards should be ordered by increasing time coordinate
- Boards should not go further back than `T0b` (you should otherwise shift them forward)
- Any board on `T0b` should not be playable (you should otherwise shift all of the boards forward by one turn)
- Please keep it to non-meme variants on the main branch and do not submit variants that are not part of the base game in the `/base` directory

So that people can easily browse the repository online, you may create a file named `README.md`, containing a short description of the variant.

## Puzzles

*TODO, looking for ideas*

<!-- DRAFT:

Puzzles should go in the `puzzles` folder.
The `puzzles` folder is organized into several sub-folders:

- `mate-in-1`

If it is your first puzzle submission, you should create a sub-folder with your name in the corresponding category and put the puzzle in it,
otherwise you should put the puzzle in your sub-folder.

-->

## Licensing

The encoded games, commentaries and analysis are available under the CC0 license, which you can read in the [LICENSE](./LICENSE) file.
Any new submission must be made available under the CC0 license.

## Using this repository

### As a submodule

You may add this repository as a git submodule in your project:

```
git submodule add https://github.com/adri326/5dchess-variants 5dchess-variants
```

Users will then have to use `git clone --recurse-submodules <your repository>` when cloning your repository.

### As an npm module

You may add this repository as an `npm` module:

```
npm install adri326/5dchess-variants
```

The module consists of a function that reads and caches the variants from the `variants/` folder:

```js
const variants = require("5dchess-variants");
// You can disable the caching behavior by uncommenting the following line:
// variants.cache = false;

console.log(variants("Standard")); // The standard variant is read from the file, cached for later requests and returned here
```
