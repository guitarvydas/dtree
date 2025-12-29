# Status on Dec. 6, 2025
# Diagram Transmogrifer
## Goal
Draw a DPL[†] diagram using draw.io.

Transmogrify the diagram to runnable code, meta-Python[%] in this case.

Manually paste the generated code into a different project (Forthish written in meta-Python) and regression test.

Use divide-and-conquer. Use whatever software tools are handy.

## How

I'm thinking that this is a linear pipeline that can be expressed in Parts Based Programming (formerly known as 0D).

Since it's linear, we could just use /bin/bash, but, I want to make the point that PBP drawware is like a Visual SHell (VSH). PBP and VSH let you go beyond linear pipelines in ways that are inconvenient to express using text-based /bin/bash.

At the moment I think that this will be done in small stages. I reserve the option to backtrack and to throw this all away if something better surfaces as I proceed.

Roughly, the stages are probably going to be:
1. Parse the .drawio save file for the diagram using OhmJS
2. Rewrite the .drawio to JSON using RWR[‡]. Cull out most of the redundant detail contained in the .drawio file leaving only juicy, semantic facts, e.g. nodes and edges, lumps of meta-Python code as text contained in nodes of a certain visual kind, connection information. 90%[+] of the .drawio file is visual syntactic sugar. The graphical rendering-sugar forms the bulk of a .drawio file. The interesting stuff can be boiled down to be a lot smaller.
3. Use various tools, like `SWIPL` (Prolog) and `jq` to manipulate the .json file and infer new information. For example, we need to find .drawio mxCells that are actually yes/no labels for edge cells, then append info to the edge cells and delete the yes/no labels (or just ignore the now-redundant label cells). Compilers do this kind of thing every day. Compilers ignore syntactic noise and perform various inferences about the code before converting the code to machine code. This is even more apparent now with PEG-based parsers that use backtracking like that which Prolog uses[*].
4. When the dust settles, after several stages of rewriting and inferencing, rewrite the JSON into meta-Python.

The point of using staged computation is that it makes everything simpler and compartmentalized. Writing code to do the same thing in a one-pass functional manner is possible and very typical, but more complicated and bug-ridden. The idea is to show that divide-and-conquer can lead to simplicity and to fresh ways of thinking about things. You are freed to expend brain-power on thinking about new ways to solve problems instead of wasting time figuring out how to do the same thing in only a functional manner.

Functions promise to give divide-and-conquer power to programmers, but, functions go only so far. To go further, you need to compartmentalize and isolate software units. UNIX pipeline commands give a hint of the power of this approach. We can do even better than that, e.g. 2D Visual SHells and Parts Based Programming (aka 0D) that allow more-than-just-linear pipelines.

I approach software Design in a Top-Down and Bottom-Up manner. First, I get an idea of what I want to accomplish (top), write a bit of code at the top, write a bit of code at the bottom. Gradually, I try to make them both meet in the middle. Modify the goals as I learn more about the problem domain. If the original goal is impossible, just throw it away and/or redefine it. If the original goal can be achieved with less work in one way than another, then tweak the goal to favour less work. And so on.

# Progress Thus Far
1. I pulled out a piece of code from the Forthish project that was giving me headaches. I know that I could have gotten the code working in the usual way by debugging, but, I drew myself a diagram of a decision tree.
![Decision Tree](xinterpret-dtree.drawio.png). 
The code and the drawing are quite short and looked like they would make for a good, very simple, example of transmogrification.
I decided to code up a transmogrifiction pipeline and to convert the diagram to a working snippet of generated code.
2. I got the first stage of transmogrification working about 5 hours after the first check-in of the code. I found it easier to manually write the OhmJS and RWR code using the `ohm-editor` and some `/bin/bash` scripts that employed the PBP and T2T tools.
3. 


[†] DPL means Diagrammatic Programming Language
[%] Meta-Python is what I call a Portable Meta Language. It looks a lot like Python, but uses brace brackets instead of indentation (easier for machine readability and machine writability) and uses some Unicode symbols to avoid the usual overloading of ASCII characters found in most traditional programming languages (like Python).
[‡] RWR is a small DSL that I developed to use in conjunction with OhmJS which allows me to easily express text-to-text rewriting. It turns out that simply rewriting text is powerful enough for many "big" tasks (like writing compilers). One needs to ignore all of the other tempations for writing classes and functions and concentrate only on what needs to be accomplished.
[+] The 90% number is just a ballpark guesstimate. I pulled the number out of thin air, and didn't actually measure it. Meant to give a gut feel for the relative amount of graphics-rendering syntactic sugar vs. semantic information contained in a .drawio file. The .drawio format is actually a variant of XML called graphML.
[*] Prolog can do more backtracking in a general way than PEG (OhmJS) does. In some cases, it is more convenient to use full-blown backtracking to inference information about 2D code. Backtracking is not a magical technique. You can implement it using loops and lists and recursive functions in most traditional languages, but, the syntax of Prolog just makes it more convenient to write relations in a concise way, without needing to worry about the niggly details of writing functions to accomplish the same tasks.
