using System;

namespace FirstConsole;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello again...");
        Console.WriteLine("What is your name?");
        var name = Console.ReadLine();
        Console.WriteLine($"{Environment.NewLine}Hello, {name}!");

    }
}
